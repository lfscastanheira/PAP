import React, { useState } from "react";
import styled from "styled-components";

const Options = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 3.5rem;
  > * {
    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
`;

const OptionsButton = styled.button`
  font-family: "Montserrat-Medium";
  background-color: ${(props) => props.theme.colors.button};
  border: unset;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 1.5rem 1.5rem 0 0;
  width: 10rem;
`;

const UnselectedOptionsButtons = styled(OptionsButton)`
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.secundary};
    color: #fff;
  }
`;

const SelectedOptionsButton = styled(OptionsButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
`;

const OptionButtons = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <>
      <Options>
        {options.map((option, index) => {
          if (selectedOption === index)
            return (
              <SelectedOptionsButton key={index}>
                {option.label}
              </SelectedOptionsButton>
            );

          return (
            <UnselectedOptionsButtons
              onClick={() => setSelectedOption(index)}
              key={index}
            >
              {option.label}
            </UnselectedOptionsButtons>
          );
        })}
      </Options>

      {options[selectedOption].option}
    </>
  );
};

export default OptionButtons;
