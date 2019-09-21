import React from 'react';
import axios, * as others from 'axios';

class updateMovie extends React.Component {
    constructor(props) {
        super(props)
        console.log("top", props)
        this.state = {
            movie: {
                id: "",
                title: "",
                director: "",
                metascore: ""
            }
        };
        this.handleChange = e => {
            console.log('clicked')
            this.setState({
                movie: {
                    ...this.state.movie,
                    [e.target.name]: e.target.value
                }
            });
        };

        this.updateMovie = (e) => {
            e.preventDefault()
            console.log('yo', props)
            axios
                .put(`http://localhost:5000/api/movies/${this.state.movie.id}`, this.state.movie)
                .then(res => {
                    const copy = [...this.props.movieList]
                    this.props.setMovieList(copy, copy[res.data.id] = res.data)
                    this.props.history.push("/");
                })
                .catch(err => console.log(err));
            ;
        }

    }
    componentWillMount() {
        const updateData = this.props.movieList.find((movie) => this.props.match.params.id == movie.id)
        if (updateData) {
            console.log(updateData)
            this.setState({ movie: updateData })
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={(e) => this.updateMovie(e)}>
                    <input
                        type="text"
                        name="title"
                        value={this.state.movie.title}
                        onChange={this.handleChange}
                        placeholder="title"
                    />
                    <input
                        type="text"
                        name="director"
                        value={this.state.movie.director}
                        onChange={this.handleChange}
                        placeholder="director"
                    />
                    <input
                        type="text"
                        name="metascore"
                        value={this.state.movie.metascore}
                        onChange={this.handleChange}
                        placeholder="metascore"
                    />

                    <button>update</button>


                </form>


            </div>
        );
    }
}

export default updateMovie;
