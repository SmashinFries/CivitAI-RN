import { Stack } from "expo-router";
import { PaperHeader } from "../../components/headers";

const ModelsLayout = () => {
    return(
        <Stack screenOptions={{title:'Models', header:(props) => <PaperHeader {...props} />}} />
    );
};

export default ModelsLayout;