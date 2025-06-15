import React from 'react'
import { useParams } from 'react-router-dom';

function StudentDetails() {
    const { id } = useParams();
  return (
    <div>StudentDetails</div>
  )
}

export default StudentDetails