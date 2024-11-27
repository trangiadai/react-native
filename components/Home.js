import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { FIRESTORE_BD } from "../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Home() {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIRESTORE_BD, "tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTask(taskList);
    } catch (error) {
      console.log("Error Fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addData = async () => {
    if (text.trim() === "") {
      console.log("Task couldn't be empty!");
      return;
    }
    try {
      await addDoc(collection(FIRESTORE_BD, "tasks"), {
        task: text,
      });
      console.log("Task added successfully");
      setText("");
      fetchTasks();
    } catch (error) {
      console.log("Error adding task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(FIRESTORE_BD, "tasks", id));
      console.log("Delete succeed");
      fetchTasks();
    } catch (error) {
      console.log("Error delete: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={task}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            <Text style={styles.taskItem}>{item.task}</Text>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TextInput
        onChangeText={setText}
        style={styles.inputText}
        placeholder="What is your task?"
        value={text}
      />
      <Button onPress={addData} title="Add" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  flatList: {
    width: "100%",
    maxHeight: 300,
  },
  taskItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  taskItem: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputText: {
    width: 300,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
