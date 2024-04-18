import { useState } from 'react'
import { PageSizes } from 'pdf-lib'
import { Dropdown, Option, Input, Text } from "@fluentui/react-components"
import { Field, Radio, RadioGroup } from "@fluentui/react-components";


// 72 dpi pixel
const pageSizePresets = {
  A3: PageSizes.A3,
  A4: PageSizes.A4,
  A5: PageSizes.A5,
  A6: PageSizes.A6,
  B3: PageSizes.B3,
  B4: PageSizes.B4,
  B5: PageSizes.B5,
  B6: PageSizes.B6,
  Letter: PageSizes.Letter,
}
type PageSizePresets = typeof pageSizePresets

type PageSizeDropdownProps = {
  setPageSize: React.Dispatch<React.SetStateAction<[number, number]>>,
  selectedPageSize: string,
  setSelectedPageSize: React.Dispatch<React.SetStateAction<string>>,
  isDisabled: boolean
}

const PageSizeDropdown = ({ setPageSize, selectedPageSize, setSelectedPageSize, isDisabled }: PageSizeDropdownProps) => {
  const pageSizeOptions = Object.keys(pageSizePresets)

  return (
    <>
      <Dropdown
        aria-labelledby="preset"
        placeholder="Preset"
        onOptionSelect={(_: InputEvent, data: Option) => {
          if (data === null) return
          const selected: keyof PageSizePresets = data.optionText
          setPageSize(pageSizePresets[selected])
          setSelectedPageSize(selected)
        }}
        value={selectedPageSize}
        disabled={isDisabled}
      >
        {pageSizeOptions.map((option: string) => (
          <Option key={option}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </>
  );
};


type PageSizeInputProps = {
  pageSize: [number, number],
  setPageSize: React.Dispatch<React.SetStateAction<[number, number]>>,
  setSelectedPageSize: React.Dispatch<React.SetStateAction<string>>,
  isDisabled: boolean
}

const PageSizeInput = ({ pageSize, setPageSize, setSelectedPageSize, isDisabled }: PageSizeInputProps) => {
  const ReceiveInput = () => {
    const widthInput = document.getElementById("PageSizeInputWidth")
    const width = (widthInput instanceof HTMLInputElement) ? widthInput.value : ""
    const heightInput = document.getElementById("PageSizeInputHeight")
    const height = (heightInput instanceof HTMLInputElement) ? heightInput.value : ""
    setPageSize([Number(width), Number(height)])
    setSelectedPageSize("")
    console.log(`set${[Number(width), Number(height)]}`)
  }
  return (
    <>
      <Input
        id="PageSizeInputWidth"
        type="number"
        style={{ width: "10em" }}
        contentAfter={
          <Text size={400}>px</Text>
        }
        onChange={ReceiveInput}
        value={pageSize[0]}
        disabled={isDisabled}
      />
      <span> x </span>
      <Input
        id="PageSizeInputHeight"
        type="number"
        style={{ width: "10em" }}
        contentAfter={
          <Text size={400}>px</Text>
        }
        onChange={ReceiveInput}
        value={pageSize[1]}
        disabled={isDisabled}
      />
    </>
  )
}

type PageSizeSettingProps = {
  pageSize: [number, number],
  setPageSize: React.Dispatch<React.SetStateAction<[number, number]>>,
}

const PageSizeSetting = ({ pageSize, setPageSize }: PageSizeSettingProps) => {
  const [isCustomDisabled, setIsCustomDisabled] = useState(true)
  const [selectedPageSize, setSelectedPageSize] = useState("")
  return (
    <>
      <div style={{ margin: "1em" }}>
        <Field label="PageSize">
          <RadioGroup
            defaultValue="original"
            onChange={(_: Event, data: HTMLInputElement) => {
              if (data.value == "original") {
                setPageSize([0, 0])
                setIsCustomDisabled(true)
              } else {
                setIsCustomDisabled(false)
              }
            }}
          >
            <Radio
              value="original"
              label={
                <>
                  Original
                  <br />
                  <Text size={200}>
                    Use image sizes as page sizes
                  </Text>
                </>
              }
            />
            <Radio
              value="custom"
              label={
                <>
                  Custom
                  <br />
                  <Text size={200}>
                    Set a certain size for all pages
                  </Text>
                </>
              }
            />
          </RadioGroup>
        </Field>

        <div style={{ marginLeft: "34px" }}>
          <PageSizeInput
            pageSize={pageSize}
            setPageSize={setPageSize}
            setSelectedPageSize={setSelectedPageSize}
            isDisabled={isCustomDisabled}
          />
          <span> or </span>
          <PageSizeDropdown
            setPageSize={setPageSize}
            selectedPageSize={selectedPageSize}
            setSelectedPageSize={setSelectedPageSize}
            isDisabled={isCustomDisabled}
          />
        </div>
      </div>
    </>
  )
}



type SettingProps = {
  pageSize: [number, number],
  setPageSize: React.Dispatch<React.SetStateAction<[number, number]>>,
}

export const Setting = ({ pageSize, setPageSize }: SettingProps) => {
  return (
    <PageSizeSetting pageSize={pageSize} setPageSize={setPageSize} />
  )
}
