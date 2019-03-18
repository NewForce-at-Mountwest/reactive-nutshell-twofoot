import React, { Component } from "react"

export default class TaskList extends Component{
    render(){
        return(
            <React.Fragment>
            <div className="addButton">
            <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/tasks/new`)}
                    }>
                Add new
            </button>
        </div>
         <article>
         <h1>Tasks</h1>
         {this.props.tasks.map(task => {
           return <div key={task.id}>
           {task.name}
           <p>{task.completionDate}</p>
          <input type="checkbox"></input>
          <button  onClick={() =>
                this.props
                  .deleteTask(task.id)
                  .then(() => this.props.history.push("/tasks"))
              }>Delete me!</button>
              
           </div>

         })}
       </article>
       </React.Fragment>
        )
    }
}