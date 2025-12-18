import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCradComponent } from './user-card.component';

describe('UserCradComponent', () => {
    let component: UserCradComponent;
    let fixture: ComponentFixture<UserCradComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserCradComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserCradComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
