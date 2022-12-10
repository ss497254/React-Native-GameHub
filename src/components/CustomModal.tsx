import * as React from "react";
import { View } from "react-native";
import { Modal as PaperModal, Portal, Text } from "react-native-paper";
import { colors, h3, radius } from "../constants/AppStyle";

export const Modal = ({
  visible,
  setVisible,
  header,
  footerContent,
  footer,
  children,
  title,
  style,
  subTitle,
}) => {
  return (
    <Portal theme={{ colors: { primaryContainer: "transparent" } }}>
      <PaperModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: "white",
          marginHorizontal: 20,
          borderRadius: radius.m,
          borderColor: colors["gray-500"],
          borderWidth: 0.7,
        }}
      >
        {header || (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderBottomColor: colors["gray-600"],
              borderBottomWidth: 0.5,
            }}
          >
            <Text style={h3}>{title}</Text>
            {subTitle && (
              <Text style={{ marginTop: -5, fontSize: 13 }}>{subTitle}</Text>
            )}
          </View>
        )}
        <View
          style={[
            {
              padding: 20,
            },
            style,
          ]}
        >
          {children}
        </View>
        {footer || (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderTopColor: colors["gray-600"],
              borderTopWidth: 0.5,
              flexDirection: "row-reverse",
              backgroundColor: colors["gray-200"],
              borderBottomEndRadius: radius.m,
              borderBottomStartRadius: radius.m,
            }}
          >
            {footerContent}
          </View>
        )}
      </PaperModal>
    </Portal>
  );
};

// import * as React from "react";
// import { StyleSheet, Text } from "react-native";
// import { Button, Portal, Dialog, MD3Colors } from "react-native-paper";

// export const Modal = ({ visible, close }) => {
//   return (
//     <Portal>
//       <Dialog onDismiss={close} visible={visible}>
//         <Dialog.Icon icon="alert" />
//         <Dialog.Title style={styles.title}>Dialog with Icon</Dialog.Title>
//         <Dialog.Content>
//           <Text>
//             This is a dialog with new component called DialogIcon. When icon is
//             displayed you should center the header.
//           </Text>
//         </Dialog.Content>
//         <Dialog.Actions>
//           <Button onPress={close} color={MD3Colors.error50}>
//             Disagree
//           </Button>
//           <Button onPress={close}>Agree</Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     textAlign: "center",
//   },
// });
