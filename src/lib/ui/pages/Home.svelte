<script lang="ts">
	import { Banner, Button, CloseButton } from 'flowbite-svelte';
	import {
		Section,
		HeroHeader,
		FeatureDefault,
		FeatureItem,
		ContentWithImage,
		Cta
	} from 'flowbite-svelte-blocks';
	import {
		ChartPieSolid,
		LandmarkSolid,
		BriefcaseSolid,
		DollarOutline,
		RocketSolid,
		CogOutline,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';
	let visible = $state(true);
</script>

<main>
	<div class="relative h-10">
		{#if visible}
			<Banner dismissable={false}>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Supercharge your hiring by taking advantage of our <a
						class="text-primary-600 dark:text-primary-500 font-medium underline hover:no-underline"
						href="/">limited-time sale</a
					> for Designer Search + Job Board. Unlimited access to over 190K top-ranked candidates and
					the #1 design job board.
				</p>
				<CloseButton
					onclick={() => (visible = false)}
					class="rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				/>
			</Banner>
		{/if}
	</div>
	<Section name="heroVisual">
		<div class="mr-auto place-self-center lg:col-span-7">
			<HeroHeader
				h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
				pClass="text-left max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 sm:px-0 lg:px-0 xl:px-0"
			>
				{#snippet h1()}Payments tool for software companies{/snippet}
				{#snippet paragraph()}From checkout to global sales tax compliance, companies around the
					world use Flowbite to simplify their payment stack.{/snippet}
				<a href="/"
					><Button size="xl" color="red" class="mr-3 inline-flex items-center justify-center"
						>Get started<ArrowRightOutline size="md" class="-mr-1 ml-2" /></Button
					>
				</a>
				<a href="/"
					><Button color="light" size="xl" class="inline-flex items-center justify-center"
						>Speak to Sales</Button
					>
				</a>
			</HeroHeader>
		</div>
		<div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
			<img
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
				alt="mockup"
			/>
		</div>
	</Section>
	<Section name="feature">
		<HeroHeader
			class="mb-8 max-w-screen-md lg:mb-16"
			h2Class="mb-4 lg:mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left"
			pClass="text-gray-500 sm:text-xl dark:text-gray-400 text-left sm:px-0 xl:px-0"
		>
			{#snippet h2()}Designed for business teams like yours{/snippet}
			{#snippet paragraph()}Here at Flowbite we focus on markets where technology, innovation, and
				capital can unlock long-term value and drive economic growth.{/snippet}
		</HeroHeader>
		<FeatureDefault>
			<FeatureItem>
				{#snippet icon()}<ChartPieSolid class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Marketing{/snippet}
				{#snippet paragraph()}Plan it, create it, launch it. Collaborate seamlessly with all the
					organization and hit your marketing goals every month with our marketing plan.{/snippet}
			</FeatureItem>
			<FeatureItem>
				{#snippet icon()}<LandmarkSolid class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Legal{/snippet}
				{#snippet paragraph()}Protect your organization, devices and stay compliant with our
					structured workflows and custom permissions made for you.{/snippet}
			</FeatureItem>
			<FeatureItem>
				{#snippet icon()}<BriefcaseSolid class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Business Automation{/snippet}
				{#snippet paragraph()}Auto-assign tasks, send Slack messages, and much more. Now power up
					with hundreds of new templates to help you get started.{/snippet}
			</FeatureItem>
			<FeatureItem>
				{#snippet icon()}<DollarOutline class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Finance{/snippet}
				{#snippet paragraph()}Audit-proof software built for critical financial operations like
					month-end close and quarterly budgeting.{/snippet}
			</FeatureItem>
			<FeatureItem>
				{#snippet icon()}<RocketSolid class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Enterprise Design{/snippet}
				{#snippet paragraph()}Craft beautiful, delightful experiences for both marketing and product
					with real cross-company collaboration.{/snippet}
			</FeatureItem>
			<FeatureItem>
				{#snippet icon()}<CogOutline class="text-primary-600 dark:text-primary-300" />{/snippet}
				{#snippet h3()}Operations{/snippet}
				{#snippet paragraph()}Keep your company’s lights on with customizable, iterative, and
					structured workflows built for all efficient teams and individual.{/snippet}
			</FeatureItem>
		</FeatureDefault>
	</Section>
	<Section name="contentwithimg">
		<ContentWithImage>
			{#snippet h2()}We didn't reinvent the wheel{/snippet}
			<p class="mb-4">
				We are strategists, designers and developers. Innovators and problem solvers. Small enough
				to be simple and quick, but big enough to deliver the scope you want at the pace you need.
				Small enough to be simple and quick, but big enough to deliver the scope you want at the
				pace you need.
			</p>
			<p>
				We are strategists, designers and developers. Innovators and problem solvers. Small enough
				to be simple and quick.
			</p>

			{#snippet image()}
				<img
					class="w-full rounded-lg"
					src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
					alt="office content 1"
				/>
				<img
					class="mt-4 w-full rounded-lg lg:mt-10"
					src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
					alt="office content 2"
				/>
			{/snippet}
		</ContentWithImage>
	</Section>
	<Section name="cta">
		<Cta ctatype="heading">
			{#snippet h2()}Start your free trial today{/snippet}
			<p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
				Try Flowbite Platform for 30 days. No credit card required.
			</p>
			<a
				href="/"
				class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2 mb-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:ring-4 focus:outline-none"
				>Free trial for 30 days</a
			>
		</Cta>
	</Section>
</main>
