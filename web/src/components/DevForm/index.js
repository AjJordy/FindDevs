import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {

	const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubusername] = useState('');
	const [techs, setTechs] = useState('');

	useEffect( () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
	}, []);
	

	async function handleSubmit(e){
		e.preventDefault();
		await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
		});
		
		setGithubusername('');
    setTechs('');
	}
	
	return (
		<form onSubmit={handleSubmit}>
		  <div className='input-block'>
			<label htmlFor='github_username'>Usuário do Github</label>
			<input 
			  name='github_username' 
			  id='github_username'
			  value={github_username}
			  onChange={e => setGithubusername(e.target.value)} 
			  required/>
		  </div>
		  
		  <div className='input-block'>
			<label htmlFor='techs'>Tecnologias</label>
			<input 
			  name='github_username' 
			  id='username_github'
			  value={techs}
			  onChange={e => setTechs(e.target.value)}  
			  required/>
		  </div>
		  
		  <div className="input-group">
			<div className='input-block'>
			  <label htmlFor='latitude'>Latitude</label>
			  <input 
				name='latitude' 
				id='latitude' 
				type='number'
				value={latitude}
				onChange={e => setLatitude(e.target.value)}
				required/>
			</div>

			<div className='input-block'>
			  <label htmlFor='longitude'>Longitude</label>
			  <input 
				name='longitude' 
				id='longitude'
				type='number'
				value={longitude}
				onChange={e => setLongitude(e.target.value)}
				required/>
			</div>           
		  </div>    

		  <button type="submit">Salvar</button>      
		</form>
	);
}


export default DevForm
