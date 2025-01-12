"use client";

import { useAuthGuard } from "@/utils/authGuard";
import LogoutButton from "@/components/LogoutButton";
import { useState, useEffect } from "react";

// 型
export interface Task {
  id?: string; // FirestoreのドキュメントID
  name: string;
}

export default function Home() {
  // 認証
  useAuthGuard();

  // 状態管理
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");

  // タスクをAPIから取得
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/firestore", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setTasks(data.data);
        console.log(data.data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // タスクを追加
  const addTask = async () => {
    if (!newTaskName.trim()) return;

    try {
      const response = await fetch("/api/firestore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTaskName }),
      });

      const data = await response.json();
      if (data.success) {
        // 新しいタスクをローカルで反映
        setTasks([...tasks, { id: data.id, name: newTaskName }]);
        setNewTaskName(""); // 入力欄をクリア
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // タスクを削除
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch("/api/firestore", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        // 削除したタスクをローカルで反映
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // コンポーネントが初期化されたときにタスクを取得
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      {/* ナビゲーションバー */}
      <div className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 z-10">
        <h1 className="text-lg font-bold">Sample Todo App</h1>
        <LogoutButton />
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col items-center justify-center mt-20 p-4">
        <div className="w-full max-w-md rounded-lg p-4 text-black">
          <div>
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between border rounded px-4 py-2 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>{task.name}</span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTask(task.id!)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row justify-center mt-4">
            <button
              onClick={addTask}
              className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-500"
            >
              +
            </button>
          </div>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Add a new task"
            className="w-full mt-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
