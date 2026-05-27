import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";

export default function OptionsButton({ onEdit, onDelete }) {
    const [visible, setVisible] = useState(false);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <IconButton
                    icon="dots-vertical"
                    onPress={() => setVisible(true)}
                />
            }
        >
            <Menu.Item
                onPress={() => {
                    setVisible(false)
                    onEdit();
                }}
                title="Edit"
            />
            <Menu.Item
                onPress={() => {
                    setVisible(false)
                    onDelete();
                }}
                title="Delete"
            />

        </Menu>

    );
}