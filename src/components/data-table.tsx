"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock API call function
const fetchData = async () => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
  ];
};

// Mock API call for form submission
const submitForm = async (id, formData) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Form submitted for id:", id, "with data:", formData);
};

const SelectItemWithIcon = ({ value, children, showIcon, tooltipContent }) => (
  <SelectItem value={value}>
    <div className="flex items-center justify-between w-full">
      <span>{children}</span>
      {showIcon && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className=" bg-white px-3 py-1.5 text-sm text-gray-700 shadow-md"
              sideOffset={5}
            >
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  </SelectItem>
);

export default function DataTable() {
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableData, setTableData] = useState<any>([]);
  const [expandedRow, setExpandedRow] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});

  const handleSubmit = async () => {
    setLoading(true);
    const data = await fetchData();
    setTableData(data);
    setLoading(false);
  };

  const handleClear = () => {
    setDropdown1("");
    setDropdown2("");
    setDropdown3("");
    setStartDate("");
    setEndDate("");
    setTableData([]);
    setExpandedRow(null);
  };

  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
    setFormData({});
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleFormSubmit = async (id, action) => {
    const requiredFields = ["question1", "question2"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setLoading(true);
    await submitForm(id, { ...formData, action });
    const newData = await fetchData();
    setTableData(newData);
    setExpandedRow(null);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 grid grid-cols-3 gap-4">
        <Select value={dropdown1} onValueChange={setDropdown1}>
          <SelectTrigger>
            <SelectValue placeholder="Dropdown 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItemWithIcon
              value="option1"
              showIcon={true}
              tooltipContent="Info about Option 1"
            >
              Option 1
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option2"
              showIcon={false}
              tooltipContent=""
            >
              Option 2
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option3"
              showIcon={true}
              tooltipContent="Info about Option 3"
            >
              Option 3
            </SelectItemWithIcon>
          </SelectContent>
        </Select>
        <Select value={dropdown2} onValueChange={setDropdown2}>
          <SelectTrigger>
            <SelectValue placeholder="Dropdown 2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItemWithIcon
              value="option1"
              showIcon={true}
              tooltipContent="Info about Option 1"
            >
              Option 1
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option2"
              showIcon={false}
              tooltipContent=""
            >
              Option 2
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option3"
              showIcon={true}
              tooltipContent="Info about Option 3"
            >
              Option 3
            </SelectItemWithIcon>
          </SelectContent>
        </Select>
        <Select value={dropdown3} onValueChange={setDropdown3}>
          <SelectTrigger>
            <SelectValue placeholder="Dropdown 3" />
          </SelectTrigger>
          <SelectContent>
            <SelectItemWithIcon
              value="option1"
              showIcon={true}
              tooltipContent="Info about Option 1"
            >
              Option 1
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option2"
              showIcon={false}
              tooltipContent=""
            >
              Option 2
            </SelectItemWithIcon>
            <SelectItemWithIcon
              value="option3"
              showIcon={true}
              tooltipContent="Info about Option 3"
            >
              Option 3
            </SelectItemWithIcon>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <div className="col-span-3 flex justify-end space-x-2">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <>
              <TableRow key={item.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleExpand(item.id)}
                  >
                    {expandedRow === item.id ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
              {expandedRow === item.id && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="p-4 bg-gray-100 rounded-md">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input
                          name="question1"
                          placeholder="Question 1"
                          value={formData.question1 || ""}
                          onChange={handleFormChange}
                          className={
                            formErrors.question1 ? "border-red-500" : ""
                          }
                        />
                        <Input
                          name="question2"
                          placeholder="Question 2"
                          value={formData.question2 || ""}
                          onChange={handleFormChange}
                          className={
                            formErrors.question2 ? "border-red-500" : ""
                          }
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleFormSubmit(item.id, "approve")}
                          disabled={loading}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleFormSubmit(item.id, "deny")}
                          variant="destructive"
                          disabled={loading}
                        >
                          Deny
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
