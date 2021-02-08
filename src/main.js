import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Laurdus',
		branchName: "main",
		companyName: "TasGroup"
	}
});

export default app;
