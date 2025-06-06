import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface FilterSidebarProps {
  type: "projects" | "people"
}

export function FilterSidebar({ type }: FilterSidebarProps) {
  const [isSkillsOpen, setIsSkillsOpen] = useState(true)
  const [isBranchOpen, setIsBranchOpen] = useState(true)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [selectedWorkMode, setSelectedWorkMode] = useState<string[]>([])

  const skills = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "Mobile Development",
    "DevOps",
    "Blockchain",
    "Cybersecurity",
    "Cloud Computing",
  ]

  const years =
    type === "projects" ? ["FE", "SE", "TE", "BE"] : ["First Year", "Second Year", "Third Year", "Final Year"]

  const branches = [
    "Computer Science",
    "Information Technology", 
    "Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Electrical",
    "Biotechnology"
  ]

  const workModes = ["Remote", "In-person", "Hybrid"]

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

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

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">College Year</h3>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <SelectableTag
              key={year}
              item={year}
              isSelected={selectedYears.includes(year)}
              onClick={() => toggleSelection(year, selectedYears, setSelectedYears)}
            />
          ))}
        </div>
      </div>

      <Collapsible open={isBranchOpen} onOpenChange={setIsBranchOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium">Branch</h3>
          {isBranchOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          <div className="flex flex-wrap gap-2">
            {branches.map((branch) => (
              <SelectableTag
                key={branch}
                item={branch}
                isSelected={selectedBranches.includes(branch)}
                onClick={() => toggleSelection(branch, selectedBranches, setSelectedBranches)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium">Skills</h3>
          {isSkillsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SelectableTag
                key={skill}
                item={skill}
                isSelected={selectedSkills.includes(skill)}
                onClick={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {type === "projects" ? (
        <div>
          <h3 className="font-medium mb-3">Work Mode</h3>
          <div className="flex flex-wrap gap-2">
            {workModes.map((mode) => (
              <SelectableTag
                key={mode}
                item={mode}
                isSelected={selectedWorkMode.includes(mode)}
                onClick={() => toggleSelection(mode, selectedWorkMode, setSelectedWorkMode)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="flex flex-wrap gap-2">
            <SelectableTag
              item="Open for projects"
              isSelected={selectedWorkMode.includes("Open for projects")}
              onClick={() => toggleSelection("Open for projects", selectedWorkMode, setSelectedWorkMode)}
            />
            <SelectableTag
              item="Available for mentoring"
              isSelected={selectedWorkMode.includes("Available for mentoring")}
              onClick={() => toggleSelection("Available for mentoring", selectedWorkMode, setSelectedWorkMode)}
            />
          </div>
        </div>
      )}

      {(selectedYears.length > 0 || selectedBranches.length > 0 || selectedSkills.length > 0 || selectedWorkMode.length > 0) && (
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setSelectedYears([])
              setSelectedBranches([])
              setSelectedSkills([])
              setSelectedWorkMode([])
            }}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 p-6 border-r bg-card/50">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}