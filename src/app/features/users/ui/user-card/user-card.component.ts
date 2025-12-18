import { Component, input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IAccount } from 'src/app/utils';

@Component({
    selector: 'rcp-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    imports: [RouterLink],
    providers: [NgForm],
})
export class UserCradComponent {
    account = input.required<IAccount>();
}
