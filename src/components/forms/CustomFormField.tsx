"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomFormFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: string; 
   autoComplete?: string;
}

type RenderFieldProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  props: CustomFormFieldProps<T>;
};

const RenderField = <T extends FieldValues>({
  field,
  props,
}: RenderFieldProps<T>) => {
  const {
    fieldType,
    placeholder,
    disabled,
    iconSrc,
    iconAlt,
    children,
    name,
    label,
    type = "text",
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border bg-[#1A1D21] border-[#363A3D]">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              type={type} // Pass the type prop to Input
              {...field}
              className="flex-1 h-11 bg-dark-400 text-14-medium text-dark-700 border-0 placeholder:text-dark-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            className="mt-2 h-11 rounded-md px-3 text-sm border bg-dark-400 border-dark-500 text-white placeholder:text-dark-600"
          />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            {...field}
            className="bg-dark-400 text-white border-dark-500 placeholder:text-dark-600"
          />
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className="h-11 bg-dark-400 text-white border-dark-500 placeholder:text-dark-600"
              disabled={disabled}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-dark-400 text-white border-dark-500">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => field.onChange(date)}
            placeholderText={placeholder}
            className="h-11 w-full rounded-md border border-dark-500 bg-dark-400 px-3 text-sm text-white placeholder:text-dark-600"
            disabled={disabled}
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <label
              htmlFor={name}
              className="text-sm text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        </FormControl>
      );

    default:
      return <p className="text-red-500">Unsupported field type: {fieldType}</p>;
  }
};

const CustomFormField = <T extends FieldValues = FieldValues>(
  props: CustomFormFieldProps<T>
) => {
  const { control, name, fieldType, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 space-y-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-white">{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;