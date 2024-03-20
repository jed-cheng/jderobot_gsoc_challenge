import { 
  CircleAlert, 
  CircleDashed, 
  CircleMinus } from "lucide-react";

export const priorities = [
    {
      label: "Low",
      value: 1,
      icon: CircleDashed ,
    },
    {
      label: "Medium",
      value: 2,
      icon: CircleMinus,
    },
    {
      label: "High",
      value: 3,
      icon: CircleAlert,
    },
]

export const categories = [
    {
      label: "Personal",
      value: "personal",
    },
    {
      label: "Work",
      value: "work",
    },
    {
      label: "Shopping",
      value: "shopping",
    },
    {
      label: "Other",
      value: "other",
    },
]

export const status = [
  {
    label: "Complete",
    value: "true",
  },
  {
    label: "Incomplete",
    value: "false",
  }
]