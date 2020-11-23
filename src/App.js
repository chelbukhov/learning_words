import React, { Component } from 'react';
import { Card, Button, Input, Form, Message, Grid} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import Speech from 'speak-tts';
import {groupCount, activeGroupCount, groupDetail, getGroupArray} from './instance';
import { render } from '@testing-library/react';
import Layout from './Layout';

const speech = new Speech() // will throw an exception if not browser supported
if(speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}
speech.init({
  'volume': 1,
     'lang': 'en-GB',
     'rate': 1,
     'pitch': 1,
     'voice':'Google UK English Male',
     'splitSentences': true,
     'listeners': {
         'onvoiceschanged': (voices) => {
             console.log("Event voiceschanged", voices)
         }
     }
})

class App extends Component {
  state = {                               // инициализация состояния свойств компонента
    groupCounter: 0,
    wc: 0,
    index: 0,
    namePage: 'start',
    currentWord: '',
    translate: '',
    pictureURL: '',
    course: {},
    currentCourseID: ''
  };






  constructor(props) {
    super(props);
    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
    // Эта привязка обязательна для работы `this` в колбэке.
    this.nextClick = this.nextClick.bind(this);
    this.mainClick = this.mainClick.bind(this);
    this.sayClick = this.sayClick.bind(this);

  }

  onSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.currentCourseID)
    this.setState({namePage: 'selected_Course'})
  }


  async sayClick() {
  speech.speak({
      text: this.state.currentWord,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
  }

  async sayText(text) {
    speech.speak({
        text: text,
          }).then(() => {
              console.log("Success !")
          }).catch(e => {
              console.error("An error occurred :", e)
          })
    }

  async handleClick() {
    //console.log('Клавиша нажата')
    let index = 0;
    while (index < this.state.groupCounter) {
      let detail = await groupDetail(index)
      index ++;
    }
  
    this.setState({namePage: 'select_group'})
//    this.sayText('In database I see ' + this.state.groupCounter + 'groups of words.')
//    this.sayText('Please, select one of them.')
    
  }

  async nextClick() {
    console.log('Следующее слово')

    this.sayClick() //прговариает текущее слово автоматом при загрузке страницы
  }

  mainClick() {
  }

 async componentDidMount(){            // будет вызываться всякий раз при отображении
    const gc = '' + await activeGroupCount();
    console.log('gc: ' + gc)
    this.setState({groupCounter : gc});
    
    let items;
    let myRes = getGroupArray(); // заполнение массива курсов в state
    myRes.then((value) =>{
      console.log('value: ', value)
      console.log('length: ', value.length)
 
      items = value.map((index) => {
       this.setState({course: value}) 

      });
    });
 }

renderCourses() {

return (
        <div>
          <Form onSubmit={this.onSubmit} >

          <Card.Group items={this.state.course} />
          <label>Введите номер курса для выбора</label>
                        <Input 
                            value ={this.state.currentCourseID}
                            onChange={event => 
                                this.setState({ currentCourseID: event.target.value})}
                        />
          </Form>
        </div>
        )
} 










  render() {
    switch (this.state.namePage) {
      case 'start':
        return (
          <Layout>
          <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Обнаружено групп слов (курсов) для изучения: {this.state.groupCounter}
            </p>
            <Button onClick={this.handleClick} color="blue" primary >
              <Button.Content visible>
                Вперед
              </Button.Content>
            </Button>
          </header>
          </div>
          </Layout>
        )
        
      case 'select_group':
        return (
          <Layout>
            <h3>Список курсов</h3>
                {this.renderCourses()}
          </Layout>
        )
      
      case 'selected_Course': //страница с детальным опсанием курса и возможностью покупки и входа в курс
        return (
          <Layout>
            <div>
            <Grid >
                            <Grid.Column width={8}>                        
                                <Message floating>
                                    <Message.Header>{`Наименование: $`}</Message.Header>
                                    <Message.Content>{`Описание: $`}</Message.Content>
                                    <Message.Content>{`Количество слов: $`}</Message.Content>
                                    <Message.Content>{`Стоимость: $`}</Message.Content>
                                </Message>
                            </Grid.Column>
               </Grid>

              <h3>Выбран курс: </h3>
              <p>{this.state.currentCourseID}</p>
            </div>
          </Layout>
        )


      default:
        return (
          <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              ...ошибка 404...
            </p>
            <button onClick={this.handleClick}> Вперед </button>
          </header>
          </div>
        )
        break;
    }
/*
    if (this.state.mainPage){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Обнаружено слов: {this.state.wc}
          </p>
          <button onClick={this.handleClick}> Вперед </button>
        </header>
      </div>
  )}
  else {
    return (
      <div>
        <header className="App-word">
          <img src={this.state.pictureURL} className="App-picture" alt="association" width="250" height="400" /> 
          <p></p>
          <button onClick={this.sayClick}> <h2>{this.state.currentWord}</h2> </button>
          <h3>{this.state.translate}</h3> 
          
          <button onClick={this.nextClick}> Следующее слово </button>
          <p></p>
          <button onClick={this.mainClick}> Главный экран </button>
        </header>

      </div>
    )
  }
  */
}

}


export default App;
