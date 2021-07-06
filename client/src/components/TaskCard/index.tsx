import React, { useState } from 'react'
import classnames from 'classnames'
import { useMutation, useQueryCache } from 'react-query'

import { deleteTodo } from 'api/deleteTodo'
import { updateTodo } from 'api/updateTodo'

import DeleteModal from 'components/DeleteModal'
import UpdateModal from 'components/UpdateModal'

import TrashIcon from 'assets/svg/trash'
import ChecklistIcon from 'assets/svg/checklist'
import ClockIcon from 'assets/svg/clock'
import PencilIcon from 'assets/svg/pencil'

type Props = {
  taskId: string,
  title: string,
  status: 'completed' | 'uncompleted'
}

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const cache = useQueryCache()

  const [removeTodo] = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const handleRemoveTodo = (type: 'delete' | 'cancel') => {
    if (type === 'delete') {
      removeTodo(taskId)
      setShowDeleteModal(false)
    }

    if (type === 'cancel') {
      setShowDeleteModal(false)
    }
  }

  const containerClass = classnames(
    [
      'relative',
      'flex',
      'justify-center',
      'box-border',
      'items-center',
      'rounded',
      'shadow-lg',
      'p-4',
      'mb-2'
    ].join(' '), {
    'bg-gray-300 bg-opacity-50': status === 'completed',
    'bg-white text-darkPurple': status === 'uncompleted'
  })

  const titleClass = classnames(
    [
      'flex-1',
      'text-sm',
      'subpixel-antialiased',
      'tracking-wide',
      'font-bold',
      'whitespace-normal',
      'truncate'
    ].join(' '), {
      'line-through': status === 'completed'
  })

  const checklistStyle = classnames('w-5 h-5', {
    'text-green-400': status === 'completed',
    'text-green-600': status === 'uncompleted'
  })

  const pencilStyle = classnames('w-5 h-5 ml-4', {
    'text-gray-400': status === 'completed',
    'text-gray-600': status === 'uncompleted',
  })

  const trashStyle = classnames('w-5 h-5 ml-4', {
    'text-red-400': status === 'completed',
    'text-red-600': status === 'uncompleted'
  })

  return (
    <div className={containerClass}>
      <p className={titleClass}>
        {title}
      </p>

    <div className="flex text-darkPurple">
      <span>
        {isLoading ? (
          <ClockIcon />
          ): (
          <ChecklistIcon className={checklistStyle} onClick={() => {
            if (status === 'completed') {
                checkTodo({
                    id: taskId, 
                    title: title,
                    status: 'uncompleted'
                });
            } else {
                checkTodo({
                    id: taskId, 
                    title: title,
                    status: 'completed'
                 });
             }
         }} />
        )}
      </span>
      <span className={pencilStyle}>
            <PencilIcon onClick={() => setShowUpdateModal(true)} />
      </span>
      <span className={trashStyle}>
        <TrashIcon onClick={() => setShowDeleteModal(true)} />
      </span>
    </div>
    <UpdateModal 
      onClose={() => setShowUpdateModal(false)}
      inProp={showUpdateModal}
      title={title}
      taskId={taskId}
    />
    <DeleteModal
      inProp={showDeleteModal}
      taskStatus={status}
      onDelete={() => handleRemoveTodo('delete')}
      onCancel={() => handleRemoveTodo('cancel')} />
  </div>
  )
}

export default TaskCard