import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, Trash2, Image as PhotoIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AvatarCropDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (croppedImage: Blob) => void;
  onRemove: () => void;
  initialImage?: string;
}

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

async function getCroppedImg(imageSrc: string, crop: any): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set canvas size to desired output size (e.g., 200x200 for avatar)
  const outputSize = 200;
  canvas.width = outputSize;
  canvas.height = outputSize;

  // Draw the cropped image
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Canvas to blob conversion failed'));
      }
    }, 'image/jpeg', 0.95);
  });
}

const AvatarCropDialog: React.FC<AvatarCropDialogProps> = ({ 
  open, 
  onClose, 
  onUpload, 
  onRemove, 
  initialImage 
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(initialImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // Sync imageSrc with initialImage when dialog opens or initialImage changes
  useEffect(() => {
    if (open && initialImage) {
      setImageSrc(initialImage);
    }
  }, [open, initialImage]);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
        // Reset crop and zoom when new image is loaded
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onUpload(croppedBlob);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleRemove = () => {
    setImageSrc(undefined);
    onRemove();
    onClose();
  };

  const handleClose = () => {
    // Reset state when closing
    setImageSrc(initialImage);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md w-full p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold">Edit Profile Photo</DialogTitle>
        </div>

        {/* Choose Different Photo Button (top) */}
        {imageSrc && (
          <div className="px-6 pb-2">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
              id="avatar-change"
            />
            <label htmlFor="avatar-change">
              <Button variant="ghost" size="sm" className="w-full mb-2 flex items-center gap-2 justify-center" asChild>
                <span className="cursor-pointer flex items-center gap-2">
                  <PhotoIcon className="h-4 w-4" />
                  Choose Different Photo
                </span>
              </Button>
            </label>
          </div>
        )}

        {/* Cropper Area */}
        <div className="px-6">
          <div 
            className="relative w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
            style={{ height: '300px' }}
          >
            {imageSrc ? (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    borderRadius: '8px',
                  },
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label 
                  htmlFor="avatar-upload"
                  className="cursor-pointer flex flex-col items-center justify-center p-6 text-center"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload a photo
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    JPG, PNG up to 10MB
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <Button
            variant="default"
            className="flex-1 flex items-center gap-2"
            disabled={!imageSrc || !croppedAreaPixels}
            onClick={handleUpload}
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center gap-2"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCropDialog;