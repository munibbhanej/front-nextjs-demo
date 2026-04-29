'use client'
import { useState } from 'react'
import styles from './page.module.css'

const tasks = [
  { id: 1, text: 'Setup GitHub repository', done: true },
  { id: 2, text: 'Connect AWS Amplify', done: true },
  { id: 3, text: 'Deploy Next.js frontend', done: false },
  { id: 4, text: 'Connect EC2 backend', done: false },
]

export default function Home() {
  const [todos, setTodos] = useState(tasks)
  const [input, setInput] = useState('')

  const addTask = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const done = todos.filter(t => t.done).length

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.badge}>AWS Amplify</div>
          <h1 className={styles.title}>Task Manager</h1>
          <p className={styles.subtitle}>
            {done} of {todos.length} tasks completed
          </p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${todos.length ? (done / todos.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <input
            className={styles.input}
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button className={styles.addBtn} onClick={addTask}>Add</button>
        </div>

        <ul className={styles.list}>
          {todos.map(task => (
            <li key={task.id} className={`${styles.item} ${task.done ? styles.done : ''}`}>
              <button className={styles.check} onClick={() => toggleTask(task.id)}>
                {task.done ? '✓' : ''}
              </button>
              <span className={styles.taskText}>{task.text}</span>
              <button className={styles.del} onClick={() => deleteTask(task.id)}>✕</button>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          Deployed on <strong>AWS Amplify</strong> · Next.js {process.env.NEXT_PUBLIC_APP_VERSION || '14'}
        </div>
      </div>
    </main>
  )
}
