import React, { Component } from "react";

import {
    ButtonBase,
    Card,
    CardContent,
    IconButton,
    Icon,
    Modal
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

// FUNC to position modal in the middle of the screen
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

// CSS for modal
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 150,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

// CSS for buttons
const btnStyle = {
    base: {
        marginTop: 20,
        justifyContent: "right",
        width: "100%"
    },
    on: {
        color: "#3f51b5",
    },
    off: {
        color: "#333",
    },
    save: {
        padding: 5,
        margin: 5,
        color: "#333",
        width: "100%"
    },
    cancel: {
        padding: 5,
        margin: 5,
        color: "red",
        width: "100%"
    }
};

class CourseSelectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    helper = (course, canDelete) => {
        if (course) {
            let id = course._id;
            let shortname = course.shortname;
            let name = course.name;
            let description = course.description;
            let link = '/course/' + shortname;
            return (
                // <div key={id} id={id} title={name}
                //     className="col-xs-12 col-md-6 col-lg-4 pt-2 pl-0">
                <div key={id} id={id} title={name} className="col-lg-12">
                    <a
                        tabIndex="0"
                        style={{ maxHeight: 30 }}
                        rel="noopener noreferrer"
                        role="button"
                        href={link}>
                        <Card>
                            <CardContent>
                                <h4>{name}</h4>
                                <p>{description}</p>
                            </CardContent>
                        </Card>
                    </a>
                    <br></br>
                </div >
            );
        } else {
            return null;
        }
    }

    // Opens the modal
    handleOpen = () => {
        this.setState({ open: true });
    };

    // Closes the modal
    handleClose = () => {
        this.setState({ open: false });
    };

    // Render all of the elements
    render() {
        const { classes } = this.props;
        const courses = [].concat(this.props.courses);
        return (
            <div>
                <IconButton
                    onClick={this.handleOpen}
                    id="configure-scene"
                    style={{
                        color: "#fff",
                        margin: 2,
                        padding: 0,
                    }}>
                    <Icon className="material-icons">book</Icon>
                </IconButton >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <div className="row" id="courses" style={{ width: "100%" }}>
                            <h3 className="col-12 p-0 mb-3 border-bottom">Available Courses</h3>
                            <hr />
                            { // Sort the users projects in alphabetical order
                                courses.sort(function (a, b) {
                                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                                }).map(course => {
                                    return this.helper(course, true);
                                })
                            }
                        </div>
                        <div className="offset-4 col-4">
                            <ButtonBase
                                style={btnStyle.save}
                                onClick={() => this.handleClose()} >
                                Close
                </ButtonBase >
                        </div>
                    </div>
                </Modal >
            </div >
        );
    }
}

const CourseSelect = withStyles(modelStyles)(CourseSelectModal);

export default CourseSelect;

