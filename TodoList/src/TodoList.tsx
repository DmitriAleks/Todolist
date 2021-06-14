import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EdiatableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('Todolist')
    const {filter} = props

    const getTasksForTodolist = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }
    let newTasks = getTasksForTodolist()

    const tasksJSX = newTasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
        return (
            <li key={t.id}>

                <span className={t.isDone ? 'is-done' : ''}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={t.isDone}
                        color={'primary'}
                    />
                     <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask} color={'secondary'}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const onClickAllFilter = useCallback(() => props.changeFilter('all', props.todoListID), [])
    const onClickActiveFilter = useCallback(() => props.changeFilter('active', props.todoListID), [])
    const onClickCompletedFilter = useCallback(() => props.changeFilter('completed', props.todoListID), [])
    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListID), [])
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID), [])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList} color={'secondary'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {tasksJSX}
            </ul>
            <div>
                <Button
                    style={{marginLeft: '5px'}}
                    color={'primary'}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                    onClick={onClickAllFilter}>All</Button>
                <Button
                    style={{marginLeft: '5px'}}
                    color={'primary'}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                    onClick={onClickActiveFilter}>Active
                </Button>
                <Button
                    style={{marginLeft: '5px'}}
                    color={'primary'}
                    size={'small'}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}

                    onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>

    )

})


export default TodoList;