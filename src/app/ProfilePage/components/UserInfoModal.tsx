import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql";

export type UserInfo = {
  first_name: string;
  last_name?: string;
  title?: string;
  bio?: string;
  location_id?: string;
  photo?: string;
  links?: { name: string; url: string }[];
};

export default function UserInfoModal({
  open,
  onClose,
  initialData,
  onUpdated,
}: {
  open: boolean;
  onClose: () => void;
  initialData: UserInfo;
  onUpdated?: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [locationId, setLocationId] = useState("");
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name || "");
      setLastName(initialData.last_name || "");
      setTitle(initialData.title || "");
      setBio(initialData.bio || "");
      setLocationId(initialData.location_id || "");
      setLinks(initialData.links || []);
    }
  }, [initialData, open]);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      onClose();
      if (onUpdated) onUpdated();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      variables: {
        input: {
          first_name: firstName,
          last_name: lastName,
          title,
          bio,
          location_id: locationId,
          links,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">First Name</label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">Last Name</label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">Title</label>
            <Input
              id="title"
              placeholder="Title (e.g. Software Engineer)"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="locationId" className="block mb-1 font-medium">Location ID</label>
            <Input
              id="locationId"
              placeholder="Location ID (optional)"
              value={locationId}
              onChange={e => setLocationId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 font-medium">Bio</label>
            <Textarea
              id="bio"
              placeholder="Bio (optional)"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Links</label>
            {links.map((link, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <Input
                  placeholder="Name"
                  value={link.name}
                  onChange={e => {
                    const newLinks = [...links];
                    newLinks[idx].name = e.target.value;
                    setLinks(newLinks);
                  }}
                  className="w-1/3"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={e => {
                    const newLinks = [...links];
                    newLinks[idx].url = e.target.value;
                    setLinks(newLinks);
                  }}
                  className="w-2/3"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => setLinks(links.filter((_, i) => i !== idx))}>
                  &times;
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setLinks([...links, { name: "", url: "" }])}>
              Add Link
            </Button>
          </div>
          {error && <div className="text-red-500 text-sm">{error.message}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 