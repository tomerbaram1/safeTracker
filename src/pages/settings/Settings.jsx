import React from 'react';
import {Text, View, Switch} from 'react-native';
import { List } from 'react-native-paper';

const Settings = () => (
  <List.AccordionGroup>
    <List.Accordion title="Profile" id="1">
      <List.Item title="Item 1" />
    </List.Accordion>
    <List.Accordion title="Add Kid" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
    <View>
      {/* <Text>
        List.Accordion can be wrapped because implementation uses React.Context.
      </Text> */}
      <List.Accordion title="Terms Of Use" id="3">
        <List.Item title="Item 3" />
      </List.Accordion>
      <View>
      <Switch
          // onValueChange = {handlerHere}
          // value = {Pre decided value if any}
        />
      </View>
    </View>
  </List.AccordionGroup>
);

export default Settings;