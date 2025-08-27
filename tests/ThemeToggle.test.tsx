import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ThemeToggle from "../src/components/ThemeToggle";
import { ThemeContext } from "../src/context/ThemeContext";
import { StyleSheet } from "react-native";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const Ionicons = (props: any) => (
    <Text>{`icon:${props.name}|${props.color}`}</Text>
  );
  return { Ionicons };
});

describe("ThemeToggle", () => {
  it("dispara toggleTheme (caminho light)", () => {
    const toggleTheme = jest.fn();
    const wrapper = ({ children }: any) => (
      <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );

    const { getByLabelText, getByText } = render(<ThemeToggle />, { wrapper });

    const btn = getByLabelText("Alternar tema");
    fireEvent.press(btn);
    expect(toggleTheme).toHaveBeenCalledTimes(1);

    getByText("icon:eye-outline|#000");

    const flat = StyleSheet.flatten((btn as any).props.style);
    expect(flat.top).toBe(12);
    expect(flat.backgroundColor).toBe("rgba(255,255,255,0.9)");
    expect(flat.borderColor).toBe("#e5e5e5");
  });

  it("caminho dark: usa fabDark, ícone eye-off-outline e cor #fff", () => {
    const toggleTheme = jest.fn();
    const wrapper = ({ children }: any) => (
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );

    const { getByLabelText, getByText } = render(<ThemeToggle />, { wrapper });

    const btn = getByLabelText("Alternar tema");
    getByText("icon:eye-off-outline|#fff");

    const flat = StyleSheet.flatten((btn as any).props.style);
    expect(flat.top).toBe(12);
    expect(flat.backgroundColor).toBe("rgba(0,0,0,0.6)");
    expect(flat.borderColor).toBe("#333");

    fireEvent.press(btn);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
