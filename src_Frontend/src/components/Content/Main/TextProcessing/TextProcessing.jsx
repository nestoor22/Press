import React from 'react';
import s from './TextProcessing.module.css';
import SentenceTemplate from './SentenceTemplate/SentenceTemplate';
import Select from 'react-select';

const TextProcessing = (props) => {
	debugger;
	let summarizedTextElements = props.textSummarized.map(item => <SentenceTemplate title={item.id} text={item.text} />);
	

	let sendRequest = () => {
		summarizedTextElements = [];
		let text = inputText.current.value;
		let reqObj = {
			original_text: text,
			number_of_sentences: props.numberOfSentencesToProcess,
			number_of_symbols: props.numberOfSymbols
		}

		let data = JSON.stringify(reqObj);

		fetch('/api/summarize/', {
			method: 'POST', // или 'PUT'
			body: data, // data может быть типа `string` или {object}!
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then((response) => {
				// console.log(JSON.stringify(response));
				console.log(response);
				props.addSentencesFromSummarizedText(response);
			})
			.catch(error => console.error('Ошибка:', error));
	}

	let inputText = React.createRef();

	let onInputChange = () => {
		let text = inputText.current.value
		props.changeTextToProcess(text)
		// console.log(text);
	}

	let inputNumber = React.createRef();

	let onDropdownChange = (event) => {
		let selectedNumberOfSentences = event.value
		console.log("this is: " + selectedNumberOfSentences)
		props.changeNumberOfSentencesToProcess(selectedNumberOfSentences)
	}

	// ?????????????????????????
	let setInput = () => {
		return {children: props.numberOfSentencesToProcess}
	}

	let options = props.dropdownOptions;
	
	const customControlStyles = {
		control: (base) => ({
			...base,
			height: 50,
		}),
		menuList: (base) => ({
			...base,
			maxHeight: 160,
		})
		
	}

	return (
		<div>
			<div className="row no-gutters">
				<div className={`${s.box}`}>
					<p className={s.headingLarge}>Process your text and get the most important information</p>
				</div>
			</div>
			<div className="row no-gutters">
				<div className="col">
					<div className={s.box}>
						<p className={s.heading}>1. Put your text here</p>
						<textarea ref={inputText} onChange={onInputChange} value={props.textToProcess} />
					</div>
					<div className={s.box}>
						<p className={s.heading}>2. How many sentences you want to get?</p>
						<div className="row no-gutters">
							<div className="col">
									<Select
										styles={customControlStyles}
										options={options}
										ref={inputNumber}

										singleValue={setInput} //Не робэ ?????
										onInputChange={props.numberOfSentencesToProcess} // ?????

										onChange={onDropdownChange}
										menuPlacement = "top"
										// value={props.numberOfSentencesToProcess}
									/>
							</div>
							<div className="col">
								<button type="button" onClick={sendRequest} className={`btn btn-outline-primary`}>Get summary</button>
							</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className={s.box}>
						<div>
							<p className={`${s.heading}`}>3. Pick up the result below</p>
						</div>
						<div className={s.posts}>
							{summarizedTextElements}
						</div>
					</div>
				</div>
			</div>


		</div>
	)
}

export default TextProcessing