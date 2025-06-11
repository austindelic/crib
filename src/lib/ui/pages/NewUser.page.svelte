<script lang="ts">
	import {
		MessageCircle,
		LayoutDashboard,
		Link2,
		Wrench,
		CalendarCheck,
		CreditCard
	} from '@lucide/svelte';
</script>

<div class="mx-auto mt-16 max-w-3xl px-4 sm:px-8">
	<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
		Welcome to <span class="font-rubikvinyl text-primary-500">crib</span> 👋
	</h1>

	<p class="mt-4 text-gray-600 dark:text-gray-300">
		Press <span class="font-semibold text-gray-900 dark:text-white">Create House</span> to get
		started. If you’re joining an existing house, select
		<span class="font-semibold text-gray-900 dark:text-white">Use Join Code</span> instead. You can always
		create your own house for friends to join later — and yes, you can be part of more than one house!
	</p>

	<h2 class="mt-10 text-xl font-bold text-gray-900 dark:text-white">
		What you can do in each house:
	</h2>

	<section class="mt-6 space-y-6">
		<div class="flex items-start gap-4">
			<MessageCircle class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Talk to your housemates in real time — whether it’s important or just for fun.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-4">
			<LayoutDashboard class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Custom Welcome Page</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Personalise your house’s homepage to reflect your vibe.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-4">
			<Link2 class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Join Code</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Generate a unique code and share it with your friends to bring them into your
					<span class="font-rubikvinyl text-primary-600">crib</span>.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-4">
			<Wrench class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Issues Page</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Log and track household problems your housemates have raised — no more forgotten
					complaints.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-4">
			<CalendarCheck class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Chores & Calendar</h3>
				<p class="text-gray-600 dark:text-gray-300">
					View your tasks, see what others need to do, and stay organised with the shared house
					calendar.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-4">
			<CreditCard class="text-primary-500 mt-1 h-5 w-5" />
			<div>
				<h3 class="font-semibold text-gray-900 dark:text-white">Bills & Reimbursements</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Handle shared expenses and settle up with your housemates — easily and transparently.
				</p>
			</div>
		</div>
	</section>

	<p class="mt-10 text-gray-600 dark:text-gray-300">
		Let’s get your <span class="font-rubikvinyl text-primary-600">crib</span> set up.
	</p>
</div>
