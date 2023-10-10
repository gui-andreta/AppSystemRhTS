import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashborad from "../pages/Dashboards";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator>
        <AppStack.Screen name="Dashborad" component={Dashborad} />
    </AppStack.Navigator>
);

export default AppRoutes;