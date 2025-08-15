"use client";
import React from "react";
import FormikTextField from "../../../components/UI/Formik/FormikTextField";
import FormikTextArea from "../../../components/UI/Formik/FormikTextArea";
import FormikDropDown from "../../../components/UI/Formik/FormikDropDown";
import FormikDatePicker from "../../../components/UI/Formik/FormikDatePicker";
import FormikCheckBox from "../../../components/UI/Formik/FormikCheckBox";
import { CustomIcon, IconButton } from "../../../components/UI/Icons/Icons";
import { PrimaryButton } from "../../../components/UI/Button/CustomizedButton";
import FormikTextEditor from "../../../components/UI/Formik/FormikTextEditor";

const FormikFormArray = ({
  event,
  formik,
  tabData,
  dynamicName,
  dynamicName2,
  setCate,
}: any) => {
  const handleDeleteFieldSet = (index: any) => {
    const updatedDynamicName = [...formik.values?.[dynamicName]];
    updatedDynamicName.splice(index, 1);
    formik.setFieldValue(dynamicName, updatedDynamicName);
  };

  return (
    <div className="w-full flex flex-col justify-center items-start pb-10">
      {formik.values?.[dynamicName]?.map((fieldSet: any, fieldSetIndex: any) => (
        <div key={fieldSetIndex} className="w-2/3 mb-5">
          {tabData?.[dynamicName]?.map((data: any, index: any) => (
            <div className="mt-5 mb-5" key={index}>
              {data.type === "text" ||
              data.type === "number" ||
              data.type === "email" ? (
                <FormikTextField
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(event: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      event.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : data.type === "textEditor" ? (
                <FormikTextEditor
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(event: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      event.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : data.type === "integer" ? (
                <FormikTextField
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(event: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      parseInt(event.target.value, 10) || "" // Parse input to integer, fallback to empty string if parsing fails
                    )
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : data.type === "textArea" ? (
                <FormikTextArea
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(event: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      event.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />

              ) : data.type === "dropDown" ? (
                <FormikDropDown
                  setCate={setCate}
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(value: any) => {
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      value
                    );
                  }}
                  onBlur={() =>
                    formik.setFieldTouched(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      true
                    )
                  }
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : data.type === "date" ? (
                <FormikDatePicker
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(value: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      value
                    )
                  }
                  onBlur={() =>
                    formik.setFieldTouched(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      true
                    )
                  }
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : data.type === "checkbox" ? (
                <FormikCheckBox
                  data={data}
                  value={fieldSet[data.name]}
                  onChange={(value: any) =>
                    formik.setFieldValue(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      value
                    )
                  }
                  onBlur={() =>
                    formik.setFieldTouched(
                      `[${dynamicName}][${fieldSetIndex}][${data.name}]`,
                      true
                    )
                  }
                  error={formik.touched[data.name] && formik.errors[data.name]}
                />
              ) : null}
            </div>
          ))}
          <div className="flex justify-start items-center pt-5">
            <PrimaryButton
              className="bg-green-500"
              onClick={() =>
                formik.setFieldValue(dynamicName, [
                  ...formik.values[dynamicName],
                  {},
                ])
              }
              addIcon
            >
              Add Fields
            </PrimaryButton>

            <IconButton
              className="ml-5 p-2"
              onClick={() => handleDeleteFieldSet(fieldSetIndex)}
            >
              <CustomIcon name="delete" className="text-red-500 " />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormikFormArray;
