export default `<header class="shadow">
	<h1>Draughts</h1>
</header>
<main>
	<section>
		<button type="button" class="large" (click)="reset">
			<span class="fa fa-bathtub"></span>
		</button>
	</section>
	<section class="reset-padding" [style]="boardStyles">
		<p>
			<span></span>Current player:</span>
			<span style="background-color:{currentPlayer}">{currentPlayer}</span>
			<span dill-if="isAI">Thinking...</span>
		</p>
		<ul class="reset-list">
			<li class="flex" dill-for="scores">
				<p class="margin-right padded line-height" style="background-color:{colour}">{colour}</p>
				<p class="margin-right padded line-height">Counters: {counters}</p>
				<p class="margin-right padded line-height">Kinged: {kinged}</p>
			</li>
		</ul>
		<ul class="reset-list flex">
			<li class="relative"
				dill-for="board"
				[style]="itemStyles"
				dill-template="itemTemplate"
				(click)="clickItem"></li>
		</ul>
	</section>
</main>`