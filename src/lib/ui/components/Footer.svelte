<script>
	import { Footer, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer footerType="socialmedia">
	<div class="mx-auto max-w-screen-xl text-center">
		<FooterLinkGroup
			class="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white"
		>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" href="/home">Home</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" href="/home/about">About</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" href="/home/pricing">Pricing</FooterLink>
			<FooterLink aClass="mr-4 hover:underline md:mr-6" href="/home/contact">Contact</FooterLink>
		</FooterLinkGroup>
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
			© 2025
			<a href="https://flowbite.com/" class="hover:underline">crib.™</a>
			All Rights Reserved.</span
		>
	</div>
</Footer>
