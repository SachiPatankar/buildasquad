import { useState, useCallback } from "react"
import { Plus, Filter as FilterIcon, X as CloseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

interface PeopleFilterState {
  selectedSkills: string[];
  selectedTitles: string[];
}

interface ProjectFilterState {
  selectedSkills: string[];
  selectedRoles: string[];
  selectedProjectTypes: string[];
  selectedWorkModes: string[];
  selectedExperienceLevels: string[];
}

type FilterSidebarProps =
  | {
      type: "projects";
      filter: ProjectFilterState;
      onFilterChange: (filter: ProjectFilterState) => void;
    }
  | {
      type: "people";
      filter: PeopleFilterState;
      onFilterChange: (filter: PeopleFilterState) => void;
    };

export function FilterSidebar({ type, filter, onFilterChange }: FilterSidebarProps) {
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "Python",
    "Java",
    "UI/UX Design",
    "DevOps"
  ])
  const [roles, setRoles] = useState([
    "Frontend",
    "Backend",
    "Fullstack",
    "Designer",
    "Product Manager",
    "QA"
  ])
  const [newSkill, setNewSkill] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const workModes = ["remote", "hybrid", "in person"]
  const experienceLevels = ["beginner", "intermediate", "advanced"]

  // Add common skills for people filter
  const commonPeopleSkills = [
    "React", "Node.js", "Python", "Java", "UI/UX Design", "DevOps", "SQL", "JavaScript", "TypeScript", "AWS", "Docker", "Figma"
  ];

 const toggleSelection = useCallback((item: string, selectedItems: string[], key: string) => {
  const normalizedItem = (key === "selectedWorkModes" || key === "selectedExperienceLevels")
    ? item.toLowerCase()
    : item;

  const newItems = selectedItems.includes(normalizedItem)
    ? selectedItems.filter((i) => i !== normalizedItem)
    : [...selectedItems, normalizedItem];

  onFilterChange({
    ...filter,
    [key]: newItems
  } as any);
}, [filter, onFilterChange]);


  // For people: add title
  const handleAddTitle = (e: React.FormEvent) => {
    e.preventDefault();
    const value = newTitle.trim();
    if (value && !(filter as any).selectedTitles.includes(value)) {
      onFilterChange({
        ...filter,
        selectedTitles: [value, ...(filter as any).selectedTitles]
      } as any)
    }
    setNewTitle("");
  };

  // For people: add skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const value = newSkill.trim();
    if (value && !(filter as any).selectedSkills.includes(value)) {
      setSkills(prev => [value, ...prev]);
      onFilterChange({
        ...filter,
        selectedSkills: [value, ...(filter as any).selectedSkills]
      } as any)
    }
    setNewSkill("");
  };

  const SelectableTag = ({ item, isSelected, onClick }: { item: string; isSelected: boolean; onClick: () => void }) => (
    <Badge
      variant={isSelected ? "default" : "outline"}
      className={`cursor-pointer transition-all hover:scale-105 ${
        isSelected 
          ? "bg-primary/10 border-primary text-primary hover:bg-primary/20" 
          : "hover:bg-muted"
      }`}
      onClick={onClick}
    >
      {item}
    </Badge>
  )

  // Helper: Render all filter controls for current type
  const renderFilters = () => (
    <div className="space-y-6 pb-2">
      {type === "projects" && (
        <div>
          {/* Tech (Skills) */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Tech</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const value = newSkill.trim()
                if (value && !skills.includes(value)) {
                  setSkills(prev => [value, ...prev])
                  toggleSelection(value, filter.selectedSkills, "selectedSkills")
                }
                setNewSkill("")
              }}
              className="mb-2 relative"
            >
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add tech..."
                className="flex-1 pr-8"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                aria-label="Add tech"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SelectableTag
                  key={skill}
                  item={skill}
                  isSelected={filter.selectedSkills.includes(skill)}
                  onClick={() => toggleSelection(skill, filter.selectedSkills, "selectedSkills")}
                />
              ))}
            </div>
          </div>
          {/* Roles */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Roles</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const value = newRole.trim()
                if (value && !roles.includes(value)) {
                  setRoles(prev => [value, ...prev])
                  toggleSelection(value, filter.selectedRoles, "selectedRoles")
                }
                setNewRole("")
              }}
              className="mb-2 relative"
            >
              <Input
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Add role..."
                className="flex-1 pr-8"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                aria-label="Add role"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <SelectableTag
                  key={role}
                  item={role}
                  isSelected={filter.selectedRoles.includes(role)}
                  onClick={() => toggleSelection(role, filter.selectedRoles, "selectedRoles")}
                />
              ))}
            </div>
          </div>
          {/* Work Mode */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Work Mode</h3>
            <div className="flex flex-wrap gap-2">
              {workModes.map((mode) => (
                <SelectableTag
                  key={mode}
                  item={mode}
                  isSelected={filter.selectedWorkModes.includes(mode)}
                  onClick={() => toggleSelection(mode, filter.selectedWorkModes, "selectedWorkModes")}
                />
              ))}
            </div>
          </div>
          {/* Experience Level */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Experience Level</h3>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((level) => (
                <SelectableTag
                  key={level}
                  item={level}
                  isSelected={filter.selectedExperienceLevels.includes(level)}
                  onClick={() => toggleSelection(level, filter.selectedExperienceLevels, "selectedExperienceLevels")}
                />
              ))}
            </div>
          </div>
          {/* Clear All Filters */}
          {(filter.selectedRoles.length > 0 || filter.selectedProjectTypes.length > 0 || filter.selectedSkills.length > 0 || filter.selectedWorkModes.length > 0 || filter.selectedExperienceLevels.length > 0) && (
            <div className="">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  onFilterChange({
                    selectedSkills: [],
                    selectedRoles: [],
                    selectedProjectTypes: [],
                    selectedWorkModes: [],
                    selectedExperienceLevels: []
                  } as any)
                }}
                className="w-fit mx-auto mt-2"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
      {type === "people" && (
        <div>
          {/* Title Input (with tag adding) */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Titles</h3>
            <form
              onSubmit={handleAddTitle}
              className="mb-2 relative"
            >
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add title..."
                className="flex-1 pr-8"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                aria-label="Add title"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              {(filter as any).selectedTitles?.map((title: string) => (
                <SelectableTag
                  key={title}
                  item={title}
                  isSelected={true}
                  onClick={() => toggleSelection(title, (filter as any).selectedTitles, "selectedTitles")}
                />
              ))}
            </div>
          </div>
          {/* Skills Input (with tag adding and common skills as suggestions) */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Skills</h3>
            <form
              onSubmit={handleAddSkill}
              className="mb-2 relative"
            >
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill..."
                className="flex-1 pr-8"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary"
                aria-label="Add skill"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mb-2">
              {(filter as any).selectedSkills?.map((skill: string) => (
                <SelectableTag
                  key={skill}
                  item={skill}
                  isSelected={true}
                  onClick={() => toggleSelection(skill, (filter as any).selectedSkills, "selectedSkills")}
                />
              ))}
            </div>
            {/* Show common skills as suggestions if not already selected */}
            <div className="flex flex-wrap gap-2">
              {commonPeopleSkills.filter(skill => !(filter as any).selectedSkills?.includes(skill)).map((skill) => (
                <SelectableTag
                  key={skill}
                  item={skill}
                  isSelected={false}
                  onClick={() => toggleSelection(skill, (filter as any).selectedSkills, "selectedSkills")}
                />
              ))}
            </div>
          </div>
          {/* Clear All Filters */}
          {((filter as any).selectedTitles?.length > 0 || (filter as any).selectedSkills?.length > 0) && (
            <div className="">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  onFilterChange({
                    selectedTitles: [],
                    selectedSkills: []
                  } as any)
                }}
                className="w-fit mx-auto mt-2"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Responsive rendering
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 p-6 bg-card/50 sticky top-0 h-screen">
        <div className="mb-6">
          <h2 className="font-semibold text-neutral-500 ">Filters</h2>
        </div>
        {renderFilters()}
      </div>
      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center p-0 bg-background border border-primary text-primary hover:bg-primary hover:text-background transition-colors lg:hidden"
              aria-label="Open filters"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            >
              <FilterIcon className="w-7 h-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="!max-w-full !w-full !h-[90vh] !max-h-[90vh] p-0 overflow-y-auto rounded-t-2xl flex flex-col">
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-background border-b flex items-center justify-between px-4 py-3">
              <span className="font-semibold text-lg">Filters</span>
              <button onClick={() => setIsSheetOpen(false)} aria-label="Close filters">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 px-4 py-4 overflow-y-auto">
              {renderFilters()}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}