import styled from "styled-components";
import { RE_DIGIT } from "@/constants/redigit";
import { useMemo } from "react";

const OtpInput = ({ value, valueLength, onChange, className }) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target) => {
    const nextElementSibling = target.nextElementSibling;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target) => {
    const previousElementSibling = target.previousElementSibling;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

  const nextInputEl = target.nextElementSibling;

if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
  return;
}
    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);

      const nextElementSibling = target.nextElementSibling;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;
    target.setSelectionRange(0, targetValue.length);
    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    focusToPrevInput(target);

    const previousElementSibling = target.previousElementSibling;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e) => {
    const { target } = e;
    const prevInputEl = target.previousElementSibling;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <>
      {valueItems.map((digit, idx) => (
        <Input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
          className={className}
        />
      ))}
    </>
  );
};

export default OtpInput;

const Input = styled.input`
  width: 65px;
  height: 65px;
  border: 1px solid #dddddd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.02em;
  color: #090809;
`;
