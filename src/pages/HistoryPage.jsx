import React, { useEffect, useState, useCallback } from "react";
import { Alert, ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { Button, Card, Checkbox, DataTable, Text } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ScreenWrapper from "../components/ScreenWrapper";
import { Spinner } from "../components/Spinner";
import { colors, radius } from "../constants/appStyle";
import { showToast } from "../lib/showToast";
import { LogTableRow } from "../components/LogTableRow";

const TableMessageContent = ({ message = "", spinner = false }) => {
  const windowWidth = Dimensions.get("window").width - 42;

  return (
    <DataTable.Row>
      <View
        style={{
          height: 500,
          justifyContent: "center",
          alignItems: "center",
          width: windowWidth,
        }}
      >
        {spinner && <Spinner color={colors["blue-500"]} size={35} />}
        <Text style={{ marginTop: 10 }} variant="labelMedium">
          {message}
        </Text>
      </View>
    </DataTable.Row>
  );
};

export const HistoryPage = () => {
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [page, setPage] = useState(0);
  const [checkBoxStatus, setCheckBoxStatus] = useState("unchecked");
  const [totalLogs, setTotalLogs] = useState(0);
  const [itemsPerPage, onItemsPerPageChange] = useState(5);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, totalLogs);

  const queryClient = useQueryClient();
  const queryResult = useQuery("/event-log", {
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const { mutateAsync: deleteLogs } = useMutation({});

  useEffect(() => {
    if (queryResult.data) setTotalLogs(queryResult.data.length);
  }, [queryResult.isFetching]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedLogIds([]);
    setCheckBoxStatus("unchecked");
  };

  const checkBoxPress = () => {
    if (queryResult.isLoading) return;

    let newSelectedLogIds;

    if (checkBoxStatus === "unchecked") {
      newSelectedLogIds = queryResult.data
        .slice(page * itemsPerPage, itemsPerPage + page * itemsPerPage)
        .map((log) => log.id);
      setCheckBoxStatus("checked");
    } else {
      newSelectedLogIds = [];
      setCheckBoxStatus("unchecked");
    }

    setSelectedLogIds(newSelectedLogIds);
  };

  const handleSelectOne = useCallback(
    (id) => {
      const selectedIndex = selectedLogIds.indexOf(id);
      let newSelectedLogIds = [];

      if (selectedIndex === -1) {
        newSelectedLogIds = newSelectedLogIds.concat(selectedLogIds, id);
      } else if (selectedIndex === 0) {
        newSelectedLogIds = newSelectedLogIds.concat(selectedLogIds.slice(1));
      } else if (selectedIndex === selectedLogIds.length - 1) {
        newSelectedLogIds = newSelectedLogIds.concat(
          selectedLogIds.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelectedLogIds = newSelectedLogIds.concat(
          selectedLogIds.slice(0, selectedIndex),
          selectedLogIds.slice(selectedIndex + 1)
        );
      }

      if (
        newSelectedLogIds.length === Math.min(itemsPerPage, totalLogs) &&
        newSelectedLogIds.length !== 0
      )
        setCheckBoxStatus("checked");
      else if (
        newSelectedLogIds.length > 0 &&
        newSelectedLogIds.length < Math.min(itemsPerPage, totalLogs)
      )
        setCheckBoxStatus("indeterminate");
      else setCheckBoxStatus("unchecked");

      setSelectedLogIds(newSelectedLogIds);
    },
    [selectedLogIds]
  );

  const handleDeleteLogs = async () => {
    const res = await deleteLogs({
      body: { ids: selectedLogIds },
      path: "/event-log",
      method: "DELETE",
    });

    if (res.affected) {
      showToast("Deleted Successfully.", "success");
      queryClient.invalidateQueries("/event-log");
      setSelectedLogIds([]);
    } else {
      showToast("Unable to Delete", "error");
    }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <Card style={{ borderRadius: radius.m }}>
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header
              style={{
                height: 60,
              }}
            >
              <View
                style={{
                  width: 50,
                  justifyContent: "center",
                }}
              >
                <Checkbox.Android
                  status={checkBoxStatus}
                  onPress={checkBoxPress}
                />
              </View>
              {selectedLogIds.length === 0 ? (
                <>
                  <DataTable.Cell
                    style={{
                      width: 50,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ID
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      width: 100,
                      paddingLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        textAlignVertical: "center",
                      }}
                    >
                      Mood
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      width: 220,
                      paddingLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        textAlignVertical: "center",
                      }}
                    >
                      Event
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 135 }}>
                    <Text style={{ textAlignVertical: "center" }}>
                      Event Date
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                      width: 80,
                    }}
                  >
                    <Text
                      style={{
                        textAlignVertical: "center",
                        textAlign: "center",
                      }}
                    >
                      Stress
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ width: 280 }}>
                    <Text style={{ textAlignVertical: "center" }}>
                      Description
                    </Text>
                  </DataTable.Cell>
                </>
              ) : (
                <Button
                  style={{
                    width: 120,
                    backgroundColor: colors["red-50"],
                    marginRight: 745,
                    borderRadius: 0,
                  }}
                  theme={{ colors: { primary: colors["red-600"] } }}
                  icon="delete"
                  contentStyle={{ height: 60 }}
                  onPress={() => {
                    Alert.alert("Delete Logs", selectedLogIds.join(" "), [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: handleDeleteLogs,
                      },
                    ]);
                  }}
                >
                  Delete
                </Button>
              )}
            </DataTable.Header>
            {queryResult.data ? (
              totalLogs > 0 ? (
                queryResult.data
                  .slice(
                    page * itemsPerPage,
                    itemsPerPage + page * itemsPerPage
                  )
                  .map((log, i) => (
                    <LogTableRow
                      log={log}
                      key={i}
                      handleSelectOne={handleSelectOne}
                      selectedLogIds={selectedLogIds}
                    />
                  ))
              ) : (
                <TableMessageContent message="You don't have any logs" />
              )
            ) : queryResult.isLoading ? (
              <TableMessageContent message="loading..." spinner />
            ) : (
              <TableMessageContent message="Unable to load logs" />
            )}
          </DataTable>
        </ScrollView>

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(totalLogs / itemsPerPage)}
          onPageChange={handlePageChange}
          label={`${from + 1}-${to} of ${totalLogs}`}
          numberOfItemsPerPage={itemsPerPage}
          numberOfItemsPerPageList={[5, 10, 15]}
          onItemsPerPageChange={(value) => {
            onItemsPerPageChange(value), setPage(0);
          }}
          selectPageDropdownLabel={"Logs per page"}
        />
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 8,
  },
});
