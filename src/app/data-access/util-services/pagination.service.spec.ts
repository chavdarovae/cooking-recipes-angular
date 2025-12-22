import { MetaDataReqModel } from '../../utils/models/generic.models';
import { PaginationService } from './pagination.service';
import { TestBed } from '@angular/core/testing';

describe('PaginationService', () => {
    let paginationService: PaginationService<MetaDataReqModel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PaginationService],
        });
        paginationService = TestBed.inject(PaginationService);
    });

    it('Creates Pagination Service', () => {
        expect(paginationService).toBeTruthy();
    });

    describe('setSate', () => {
        it('should not have default state on creation, when no session storage entry', () => {
            expect(paginationService.prevReqMetaData()).toEqual(null);
        });
        it('should load the initial state from session storage', () => {
            sessionStorage.setItem(
                PaginationService.META_DATA_KEY,
                JSON.stringify({ page: 3, pageSize: 10 }),
            );

            const service = new PaginationService(); // creates a fresh service instance

            expect(service.prevReqMetaData()).toEqual(
                new MetaDataReqModel(3, 10),
            );
        });
        it('should set state', () => {
            paginationService.setState(new MetaDataReqModel(2, 5));
            expect(paginationService.prevReqMetaData()).toEqual(
                new MetaDataReqModel(2, 5),
            );

            const stored = sessionStorage.getItem(
                PaginationService.META_DATA_KEY,
            );
            if (stored) {
                expect(JSON.parse(stored)).toEqual(new MetaDataReqModel(2, 5));
            }
        });
    });
});
