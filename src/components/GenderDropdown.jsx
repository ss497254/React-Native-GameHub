import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { Portal, RadioButton, TextInput } from "react-native-paper";
import { Modal } from "./CustomModal";
import { radius } from "../constants/appStyle";

export const DropDown = ({
  label,
  placeholder,
  value,
  setValue,
  mode,
  list,
  ...inputProps
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    Keyboard.dismiss();
    setModalOpen(true);
  };

  const onValueChange = (value) => {
    setValue(value);
    setModalOpen(false);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={modalOpen}
          setVisible={setModalOpen}
          header={<View />}
          style={{ padding: 0, paddingVertical: 12 }}
          footer={<View />}
        >
          <RadioButton.Group
            value={value}
            onValueChange={onValueChange}
            style={{ padding: 0 }}
          >
            {list.map((item, idx) => (
              <RadioButton.Item
                key={idx}
                label={item.label}
                value={item.value}
              />
            ))}
          </RadioButton.Group>
        </Modal>
      </Portal>
      <TextInput
        value={value}
        mode={mode}
        label={label}
        onFocus={openModal}
        showSoftInputOnFocus={false}
        placeholder={placeholder}
        onChange={openModal}
        {...inputProps}
      />
    </>
  );
};

export const Genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Unspecified",
    label: "Unspecified",
  },
];

export const GenderDropdown = ({ value, onValueChange, ...props }) => {
  return (
    <DropDown
      label={"Gender"}
      theme={{ roundness: radius.m }}
      mode="outlined"
      value={value}
      setValue={onValueChange}
      list={Genders}
    />
  );
};
