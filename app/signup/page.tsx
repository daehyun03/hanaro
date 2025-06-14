import { SignupForm } from '@/components/signup-form';
import Logo from '@/components/Logo';

export default function SignUpPage() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex items-center gap-2 self-center font-medium">
					<Logo/>
				</div>
				<SignupForm />
			</div>
		</div>
	)
}