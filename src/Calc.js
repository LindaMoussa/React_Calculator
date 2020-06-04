import React, {Component} from 'react';
import Button from './components/button';
import './css/style.css';

class Calc extends Component {
 
    constructor(props){
        super(props);
        this.state= {
            current: '',
            previous : []
        }
    }

    reset =() => {
        this.setState({current: '0', previous: [] , nextIsReset: false});
    }

    addTocurrent= (symbol) => {
        console.log("Symbol");
        if(["/","-","+","*"].indexOf(symbol) > -1){
            let {previous} = this.state;
            previous.push(this.state.current + symbol);
            this.setState({previous , nextIsReset:true});

        }
        else{
            if((this.state.current === "0" && symbol !== ".")|| this.state.nextIsReset)
            {
                this.setState({current: symbol , nextIsReset: false});
            }
            else{
                this.setState({current: this.state.current + symbol});
            }
            
        }

    }

    calculate =(symbol) =>{
     let {current , previous ,nextIsReset} = this.state;
     if(previous.length >0 ){
    current = eval(String( previous[previous.length -1] + current));
    this.setState({current , previous:[], nextIsReset:true});      
}
    }
    render(){
        const buttons=[
            {symbol: 'C' , cols: 3, action: this.reset},
            {symbol: '/' , cols: 1, action: this.addTocurrent},
            {symbol: '7' , cols: 1, action: this.addTocurrent},
            {symbol: '8' , cols: 1, action: this.addTocurrent},
            {symbol: '9' , cols: 1, action: this.addTocurrent},
            {symbol: '*' , cols: 1, action: this.addTocurrent},
            {symbol: '4' , cols: 1, action: this.addTocurrent},
            {symbol: '5' , cols: 1, action: this.addTocurrent},
            {symbol: '6' , cols: 1, action: this.addTocurrent},
            {symbol: '-' , cols: 1, action: this.addTocurrent},
            {symbol: '1' , cols: 1, action: this.addTocurrent},
            {symbol: '2' , cols: 1, action: this.addTocurrent},
            {symbol: '3' , cols: 1, action: this.addTocurrent},
            {symbol: '+' , cols: 1, action: this.addTocurrent},
            {symbol: '0' , cols: 1, action: this.addTocurrent},
            {symbol: '.' , cols: 1, action: this.addTocurrent},
            {symbol: '=' , cols: 2, action: this.calculate},

        ];
        return(
            
            <div className="calc">
                { this.state.previous.length > 0 ?
                 <div className="floaty-last">{this.state.previous[this.state.previous.length - 1]}</div>
                    :null
                }
               <h2>Calculator</h2>
               <input className="result" type="text" value={this.state.current}/>
               
              {buttons.map((btn,i) => {
                  return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
                  
              })}
            </div>            
        )
    }
}

export default Calc;