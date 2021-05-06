import React from 'react';
import {View as NativeView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "column",
    flexGrow:0,
  },

  flexRow: {
    flexDirection: "row",
  },

  flexJustifySpaceBetween: {
    justifyContent: "space-between",
  },

  alignItemsCenter: {
    alignItems: "center",
  },

  alignItemsStart: {
    alignItems: "flex-start",
  },

});


const View = ({ flexDirection, justifyContent, alignItems, style, ...props }) => {
  const viewStyles = [
    styles.flex,
    flexDirection === "row" && styles.flexRow,
    justifyContent === "space-between" && styles.flexJustifySpaceBetween,
    alignItems === "center" && styles.alignItemsCenter,
    alignItems === "start" && styles.alignItemsStart,
    style,
  ];

  return(
    <NativeView style={viewStyles} {...props}/>
  );
};

export default View;