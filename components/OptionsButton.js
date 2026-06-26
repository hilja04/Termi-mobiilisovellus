import { useState } from "react";
import { Menu, IconButton, Divider } from "react-native-paper";
import styles from "./styles";

export default function OptionsButton({ actions = [], color = "black", variant = "dark" }) {
    const [visible, setVisible] = useState(false);

    const variants = { 
        dark: {
            backgroundColor: "#2e2e2e",
            textColor: "white",
        },
        light: {
            backgroundColor: "white",
            textColor: "black",
        },
        header: {
            backgroundColor: "#3a3a3a",
            textColor: "white",
        },
    };

    const theme = variants[variant] || variants.dark;

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <IconButton
                    iconColor={color}
                    icon="menu"
                    onPress={() => setVisible(true)}
                />
            }
            contentStyle={{
                borderRadius: 8,
                paddingVertical: 4,
                backgroundColor: theme.backgroundColor,
            }}
        >
            {actions.map((action, index) => (
                <Menu.Item
                    key={index}
                    title={action.label}
                    titleStyle={{ color: theme.textColor }}
                    onPress={() => {
                        setVisible(false);
                        action.onPress();
                    }}
                    style={{
                        paddingVertical: 6,
                        paddingHorizontal: 12,

                    }}
                />
            ))}
        </Menu>
    );
}
