import React from 'react'
import { connect } from 'react-redux'

const AddTodo = ({ update,data }) => {
  let input
  console.log(data)
  return (
    <div>
        <input ref={node => input = node} onChange={e=>{
        }}/>
    </div>
  )
}
export default AddTodo;
// const mapStateToProps = (state)=>{
//     return ({
//         data:state
//     })
// }
// export default connect(mapStateToProps)(AddTodo)
