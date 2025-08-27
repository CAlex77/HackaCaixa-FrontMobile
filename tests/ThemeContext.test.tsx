import React from "react";
import { Pressable, Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider, useThemeCtx } from "../src/context/ThemeContext";

const Demo = () => {
  const { theme, toggleTheme } = useThemeCtx();
  return (
    <>
      <Text>{theme}</Text>
      <Pressable testID="btn" onPress={toggleTheme} />
    </>
  );
};

describe("ThemeContext", () => {
  it("alterna entre light e dark", () => {
    const { getByText, getByTestId, queryByText } = render(
      <ThemeProvider>
        <Demo />
      </ThemeProvider>
    );

    getByText("light");

    fireEvent.press(getByTestId("btn"));
    expect(queryByText("light")).toBeNull();
    getByText("dark");
  });
});
