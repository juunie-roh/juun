const config = {
  extends: ['@commitlint/config-conventional'],
  types: [
    /**
     * @inner
     * 아래 변화들은 보이도록 한다.
     * (presetConfig는 conventional-changelog 방식을 따른다.)
     *
     * @see
     * https://github.com/semantic-release/release-notes-generator
     * https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.0.0/README.md
     */
    { type: 'feat', section: '✨ Features', hidden: false },
    { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
    { type: 'perf', section: '🌈 Performance', hidden: false },
    { type: 'refactor', section: '♻️ Refactor', hidden: false },
    { type: 'docs', section: '📝 Docs', hidden: false },
    { type: 'style', section: '💄 Styles', hidden: false },
    { type: 'revert', section: '🕐 Reverts', hidden: false },
    { type: 'ci', section: '💫 CI/CD', hidden: false },

    /**
     * @inner
     * 아래 변화들은 보이지 않게 한다.
     */
    { type: 'test', section: '✅ Tests', hidden: true },
    { type: 'chore', section: '📦 Chores', hidden: true },
    { type: 'move', section: '🚚 Move Files', hidden: true },
    { type: 'remove', section: '🔥 Remove Files', hidden: true },
  ],
};
export default config;
