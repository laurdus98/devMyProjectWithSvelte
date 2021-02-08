import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Laurdus',
		branch: "main"
	}
});

export default app;
