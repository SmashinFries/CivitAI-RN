import { Button, Dialog, RadioButton } from 'react-native-paper';
import { useSettingsStore } from '../../store';
import { CivitAiNSFW } from '../../api/civitai';
import { useState } from 'react';

type NSFWLevelDialogProps = {
    visible: boolean;
    onDismiss: () => void;
};
export const NSFWLevelDialog = ({ visible, onDismiss }: NSFWLevelDialogProps) => {
    const { maxNSFWLevel, setMaxNSFWLevel } = useSettingsStore();
    const [selectedValue, setSelectedValue] = useState<CivitAiNSFW>(maxNSFWLevel);

    const onConfirm = (value:CivitAiNSFW) => {
        setMaxNSFWLevel(value);
        onDismiss();
    };

    return (
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>NSFW Level</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                >
                    <RadioButton.Item
                        label={`${CivitAiNSFW.None} (Safe)`}
                        value={CivitAiNSFW.None}
                    />
                    <RadioButton.Item
                        label={`${CivitAiNSFW.Soft} (13+)`}
                        value={CivitAiNSFW.Soft}
                    />
                    <RadioButton.Item
                        label={`${CivitAiNSFW.Mature} (17+)`}
                        value={CivitAiNSFW.Mature}
                    />
                    <RadioButton.Item label={`${CivitAiNSFW.X} (18+)`} value={CivitAiNSFW.X} />
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>Cancel</Button>
                <Button onPress={() => onConfirm(selectedValue)}>Done</Button>
            </Dialog.Actions>
        </Dialog>
    );
};
