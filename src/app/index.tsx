import { Redirect, useRootNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

const IndexPage = () => {
    return <Redirect href="/models" />;
};

export default IndexPage;