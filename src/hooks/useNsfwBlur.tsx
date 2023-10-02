import { useMemo, useState } from 'react';
import { useSettingsStore } from '../store';
import { CivitAiNSFW } from '../api/civitai';

const nsfwLevelOrder = [CivitAiNSFW.None, CivitAiNSFW.Soft, CivitAiNSFW.Mature, CivitAiNSFW.X];

export const useNsfwBlur = (nsfwLevel: CivitAiNSFW) => {
    const [isBlur, setIsBlur] = useState<boolean>(true);
    const { maxNSFWLevel } = useSettingsStore();

    const userNsfwLevel = useMemo(
        () => nsfwLevelOrder.findIndex((value) => value === maxNSFWLevel),
        [maxNSFWLevel],
    );
    const imageNsfwLevel = useMemo(
        () => nsfwLevelOrder.findIndex((value) => value === nsfwLevel),
        [nsfwLevel],
    );

    const blurAmount = useMemo(
        () => (userNsfwLevel < imageNsfwLevel && isBlur ? 200 : 0),
        [userNsfwLevel, imageNsfwLevel, isBlur],
    );

    const toggleBlur = () => setIsBlur((prev) => !prev);

    return { blurAmount, toggleBlur };
};
