<script lang="ts">
	import {
		Calendar,
		TimeGrid,
		ResourceTimeGrid,
		ResourceTimeline,
		DayGrid,
		List,
		Interaction
	} from '@event-calendar/core';

	import '@event-calendar/core/index.css';

	let calendarRef;
	// const { options }: { options: Calendar.Options } = $props();

	let options: Calendar.Options = $state({
		editable: false,
		view: 'timeGridWeek',
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		buttonText: {
			today: 'Today',
			timeGridWeek: 'Week',
			timeGridDay: 'Day',
			dayGridMonth: 'Month',
			listDay: 'Agenda',
			listWeek: 'Weekly Agenda'
		},
		scrollTime: '09:00:00',
		views: {
			timeGridWeek: { pointer: true },
			resourceTimeGridWeek: { pointer: true },
			resourceTimelineWeek: {
				slotDuration: '00:15',
				slotLabelInterval: '01:00',
				slotMinTime: '09:00',
				slotMaxTime: '21:00',
				slotWidth: 16
			}
		},
		dayMaxEvents: true,
		nowIndicator: true,
		selectable: true
	});
</script>

<main>
	<Calendar bind:this={calendarRef} plugins={[TimeGrid, DayGrid, List, Interaction]} {options} />
</main>
