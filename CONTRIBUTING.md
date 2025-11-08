# Contributing to Tools For Dev

Thank you for your interest in contributing to Tools For Dev! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/JewelPaul/TOOLS--FOR--DEV/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, Node version)

### Suggesting Features

1. Search existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Any relevant examples

### Adding a New Tool

We welcome new tools! Here's how to add one:

1. **Choose a tool category** from the existing 9 categories or propose a new one
2. **Register the tool** in `src/lib/data/tools.ts`:

```typescript
{
  id: 'your-tool-id',
  title: 'Your Tool Name',
  slug: 'your-tool-slug',
  category: 'text', // or code, image, etc.
  description: 'Brief description of what the tool does',
  tags: ['tag1', 'tag2', 'tag3'],
  clientOnly: true, // true if runs in browser, false if needs server
  premium: false, // true if premium-only feature
}
```

3. **Create the tool page** at `src/app/tools/[your-tool-slug]/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { ToolPageLayout, ToolCard, ToolSidebarInfo } from '@/components/tool-layout';

export default function YourToolPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    // Your tool logic here
  };

  return (
    <ToolPageLayout
      title="Your Tool Name"
      description="Description of what the tool does"
      onCopy={() => navigator.clipboard.writeText(output)}
      sidebar={
        <ToolSidebarInfo>
          <p>Explanation of how the tool works</p>
        </ToolSidebarInfo>
      }
    >
      <ToolCard title="Input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border p-3"
        />
      </ToolCard>

      <ToolCard title="Output">
        <div className="rounded-md border p-3">
          {output || 'Output will appear here...'}
        </div>
      </ToolCard>
    </ToolPageLayout>
  );
}
```

4. **Test your tool** thoroughly
5. **Submit a pull request**

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Follow the existing code style
   - Write clear, concise commit messages
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new tool for X"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**:
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/JewelPaul/TOOLS--FOR--DEV.git
cd TOOLS--FOR--DEV
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and small
- Use proper prop typing

### Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistency with existing design
- Use semantic color tokens (primary, muted, etc.)

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Pages: `kebab-case/page.tsx`

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Build process or auxiliary tool changes

Examples:
```
feat: add JSON formatter tool
fix: resolve QR code generation issue
docs: update README with new tools
style: format code with prettier
refactor: extract common validation logic
test: add unit tests for case converter
chore: update dependencies
```

## Testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Writing Tests
- Place tests next to the file being tested
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for high coverage on utility functions

Example:
```typescript
import { convertCase } from './utils';

describe('convertCase', () => {
  it('should convert text to uppercase', () => {
    const result = convertCase('hello world', 'uppercase');
    expect(result).toBe('HELLO WORLD');
  });
});
```

## Documentation

- Update README.md for major features
- Add JSDoc comments for complex functions
- Update CHANGELOG.md for user-facing changes
- Keep inline comments clear and concise

## Tool Categories

Current categories:
1. Text & String Tools
2. Code & Developer Tools
3. Image & Media Tools
4. PDF & Document Tools
5. Data & Spreadsheet Tools
6. SEO & Marketing Tools
7. Network & Security Tools
8. Utilities & Converters
9. Productivity Tools

Proposing a new category? Open an issue first for discussion.

## Privacy & Security

- **Client-side first**: Prefer client-side processing when possible
- **No data collection**: Don't log or store user inputs
- **Input validation**: Sanitize all user inputs
- **Dependencies**: Keep dependencies up to date
- **Security**: Report security issues privately

## Getting Help

- Check [existing issues](https://github.com/JewelPaul/TOOLS--FOR--DEV/issues)
- Read the [documentation](README.md)
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Acknowledged in commit history

Thank you for contributing to Tools For Dev! 🛠️

---

Last updated: 2024-02-05
