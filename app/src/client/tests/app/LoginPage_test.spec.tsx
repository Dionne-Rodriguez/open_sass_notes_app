import {describe, test, vi} from 'vitest';
import {useAuth} from 'wasp/client/auth';
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../auth/LoginPage';

vi.mock('wasp/client/auth', () => ({
    useAuth: vi.fn()
}))

console.log(useAuth, 'Check here!!!')

describe('Tests for LoginPage', () => {
    test('LoginPage should render', async () => {
        vi.mocked(useAuth).mockImplementation(() => ({
            data: null,
            error: null,
            isError: false,
            isSuccess: true,
            refetch: async () => {},
            status: 'success'
        }));

        // render(
        //     <MemoryRouter>
        //         <LoginPage/>
        //     </MemoryRouter>
        // )
    })
})