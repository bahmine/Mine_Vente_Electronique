import React,{useEffect} from 'react';
import Product from './Product'
import Pagination from './Pagination'
import {fetchProducts} from '../../lib/state/actions';
import {useDispatch,useSelector} from 'react-redux';

const Results = ({ items, pageIndex }) => !!items.length && items[pageIndex].map(product => <Product key={product.id} {...product}/>)
const Empty = ({ isVisible }) => !isVisible && <p style={{marginLeft: 18, fontSize: 18}}>Aucune annonce disponible ... </p>
const Loading = ({ isLoading }) => isLoading && <p style={{marginLeft: 18, fontSize: 18}}>Chargement... </p>

const Gallery = () => { 
	// fetch products
	const dispatch = useDispatch ();
	const state = useSelector (state => ({...state.products}));
	//const {items,isLoading} = state;
	useEffect (() => {
		dispatch (fetchProducts());
	},[]);
	const items = null;
	const isLoading = false;
	return (
	<>
		<section className="mt-3 mb-5">
			<header className="section-heading mb-5">
				<h3 className="title-section">Produits</h3>
			</header>
			<div className="row">
				<Loading isLoading={isLoading}/>
				<Results {...state}/>
				<Empty isVisible={!!items}/>
			</div> 
			<div className="clearfix"></div>
		</section>
		<Pagination />
	</>
	)
}
export default Gallery